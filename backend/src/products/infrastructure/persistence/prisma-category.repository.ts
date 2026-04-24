import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { ICategoryRepository } from '../../domain/repositories/category.repository';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findIdBySlug(slug: string): Promise<string | null> {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            select: { id: true },
        });

        return category?.id ?? null;
    }
}
