export default interface SignUpRequestDto{
    email: string;
    password: string;
    nickname: string;
    telNum: string;
    address: string;
    addressDetail: string | null;
    agreedPersonal: boolean;
}