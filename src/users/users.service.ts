import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

constructor(@InjectRepository(User) private userRepo:Repository<User>){}
 async create(createUserDto:CreateUserDto){

  const existingUser = await this.userRepo.findOneBy({
    email : createUserDto.email
  })

if (existingUser){
  throw new ConflictException("This emial already exists")
}

const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
const userPayload = this.userRepo.create({...createUserDto, password:hashedPassword})

return await this.userRepo.save(userPayload)

 }

  findEvery() {
    return this.userRepo.find()
  }

 async findOne(email:string){
  const user = await this.userRepo.findOneBy({email})
  if(!user){
    throw new NotFoundException("This user does not exist")
  }
  return user
 }
 
 

}
