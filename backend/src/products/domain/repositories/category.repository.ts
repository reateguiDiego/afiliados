export interface ICategoryRepository {
    findIdBySlug(slug: string): Promise<string | null>;
}
