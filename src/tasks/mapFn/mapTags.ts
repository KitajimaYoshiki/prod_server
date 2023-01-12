import { tags } from '../dto/tags';
import { Tags } from '../entities/tags.entity';

export function mapTags(tags: Tags) {
  const tag: tags = {
    id: tags.tag_id,
    name: tags.tag_name,
  };

  return tag;
}
