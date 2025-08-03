import Image from 'next/image';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { isResolvedAsset } from './contentful';
import { ReactNode } from 'react';

export function renderRichText(document: Document): ReactNode {
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = node.data.target;

        if (entry.sys.contentType.sys.id === 'componentRichImage') {
          const { image, caption, fullWidth } = entry.fields;

          const asset = isResolvedAsset(image) ? image : undefined;
          const url = asset?.fields.file?.url;

          if (typeof url !== 'string') return null;

          return (
            <figure className={fullWidth ? 'w-full' : 'w-[80%] mx-auto'}>
              <Image src={url} alt={caption || ''} className="w-full rounded" width={500} height={250}/>
              {caption && (
                <figcaption className="text-sm text-center text-gray-500 mt-2">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      },
    },
  };

  return documentToReactComponents(document, options);
}
