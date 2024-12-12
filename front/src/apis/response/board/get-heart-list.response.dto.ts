import { HeartListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetHeartListResponseDto extends ResponseDto{
    heartList: HeartListItem[]
}