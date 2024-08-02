package com.adopetme.api_gateway.configuration;

import com.adopetme.api_gateway.dto.RequestDTO;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.regex.Pattern;

@Component
@ConfigurationProperties(prefix = "public-paths")
@Data
public class RouteValidator {
    private List<RequestDTO> paths;

    public boolean isPublicPath(RequestDTO requestDTO) {
        return paths.stream().anyMatch(p ->
                Pattern.matches(p.getUri(),requestDTO.getUri()) && p.getMethod().equals(requestDTO.getMethod()));
    }
}
