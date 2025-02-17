// import { Injectable } from '@nestjs/common';
// import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';

// @Injectable()
// export class ChatService {
//   create(createChatDto: CreateChatDto) {
//     return 'This action adds a new chat';
//   }

//   findAll() {
//     return `This action returns all chat`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} chat`;
//   }

//   update(id: number, updateChatDto: UpdateChatDto) {
//     return `This action updates a #${id} chat`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} chat`;
//   }
// }
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  private chats: { id: number, message: string }[] = [];
  private idCounter = 1;

  create(createChatDto: CreateChatDto) {
    const newChat = { id: this.idCounter++, ...createChatDto };
    this.chats.push(newChat);
    return newChat;
  }

  findAll() {
    return this.chats;
  }

  findOne(id: number) {
    return this.chats.find(chat => chat.id === id);
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    const chatIndex = this.chats.findIndex(chat => chat.id === id);
    if (chatIndex > -1) {
      this.chats[chatIndex] = { ...this.chats[chatIndex], ...updateChatDto };
      return this.chats[chatIndex];
    }
    return null;
  }

  remove(id: number) {
    const chatIndex = this.chats.findIndex(chat => chat.id === id);
    if (chatIndex > -1) {
      const removedChat = this.chats.splice(chatIndex, 1);
      return removedChat[0];
    }
    return null;
  }

  
}
