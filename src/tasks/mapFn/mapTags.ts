import { tag } from '../dto/tag';
import { Tags } from '../entities/tags.entity';

export function mapTags(tags: Tags) {
  const tag: tag = {
    id: tags.tag_id,
    name: tags.tag_name,
  };

  return tag;
}
