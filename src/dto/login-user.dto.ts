import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, Length, IsNotEmpty } from "class-validator";

export class LoginUserDTO {

    @ApiProperty({
        description: "UserName",
        type: String,
        example: "Maratul Azizah",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\S*$/i)
    @Length(1, 30)
    username: string;

    @ApiProperty({
        description: "Password",
        type: String,
        example: "Ijaaaaa",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\S*$/i)
    @Length(1, 30)
    password : string;
    
}

 