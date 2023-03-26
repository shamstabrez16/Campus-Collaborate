package com.campuscollaborate.dto;

import com.campuscollaborate.entity.UserEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto extends ErrorResponseDto{
    private Long projectId;
    private String projectName;
    private String projectDescription;
    private Date publishedAt;

    private String projectRole;

    private String location;

    private String jobDescription;

    private UserDto publishedBy;

    private Date deadline;
    private String email;


}
