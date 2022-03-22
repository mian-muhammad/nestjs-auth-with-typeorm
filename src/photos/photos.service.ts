import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
  ) {}

  create(createPhotoDto: CreatePhotoDto, user) {
    const photo = new Photo();
    photo.url = createPhotoDto.url;
    photo.user = user;
    return this.photosRepository.save(photo);
  }

  findAll(user) {
    return this.photosRepository.find({
      where: { user },
      // relations: { user: true },
    });
  }

  findOne(id: number, user) {
    return this.photosRepository.findOne({ where: { id, user } });
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
