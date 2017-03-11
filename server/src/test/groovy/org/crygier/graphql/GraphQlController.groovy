package org.crygier.graphql

import com.fasterxml.jackson.databind.ObjectMapper
import graphql.ExecutionResult
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
@CompileStatic
class GraphQlController {

    @Autowired
    private GraphQLExecutor graphQLExecutor;

    @Autowired
    private ObjectMapper objectMapper;

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/graphql", method = RequestMethod.POST)
    @ResponseBody
    public Object executeOperation(@RequestBody Map body) {
        String query = (String) body.get("query");
        Map<String,Object> variables = getVariablesAsMap(body.get("variables"));

        return getTransformedResult(graphQLExecutor.execute(query, variables));
    }

    private Map<String, Object> getVariablesAsMap(Object variables) {
        Map<String,Object> variablesMap = new HashMap<>();

        if (variables instanceof String) {
            String variablesString = (String)variables;
            variablesString = variablesString.substring(1, variablesString.length()-1);
            String[] keyValuePairs = variablesString.split(",");

            for(String pair : keyValuePairs)
            {
                String[] entry = pair.split(":");
                String trimmedKey = entry[0].trim();
                variablesMap.put(trimmedKey.substring(1, trimmedKey.length()-1), entry[1].trim());
            }
        }
        else {
            variablesMap = (Map<String,Object>)variables;
        }

        return variablesMap;
    }

    private Map<String, Object> getTransformedResult(ExecutionResult executionResult) {
        Map<String, Object> result = new LinkedHashMap<>();
        if (executionResult.getErrors().size() > 0) {
            result.put("errors", executionResult.getErrors());
        }
        result.put("data", executionResult.getData());
        return result;
    }

}