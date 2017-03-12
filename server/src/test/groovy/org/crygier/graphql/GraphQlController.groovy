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
        return variables instanceof String ? objectMapper.readValue(variables, Map.class) : (Map<String, Object>)variables;
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