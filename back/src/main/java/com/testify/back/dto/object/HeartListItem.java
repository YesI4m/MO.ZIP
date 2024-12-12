package com.testify.back.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.testify.back.repository.resultSet.GetHeartListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HeartListItem {
    private String email;
    private String nickname;
    private String profileImage;

    public HeartListItem(GetHeartListResultSet resultSet){
        this.email = resultSet.getEmail();
        this.nickname = resultSet.getNickname();
        this.profileImage = resultSet.getProfileImage();
    }

    public static List<HeartListItem> copyList(List<GetHeartListResultSet> resultSets){

        List<HeartListItem> list = new ArrayList<>();
        for (GetHeartListResultSet resultSet: resultSets){
            HeartListItem heartListItem = new HeartListItem(resultSet);
            list.add(heartListItem);
        }
        return list;
    }
}
