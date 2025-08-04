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
            <figure className={fullWidth ? 'w-full my-8' : 'w-[80%] mx-auto my-8'}>
              <Image src={url} alt={caption || ''} width={800}
              height={500}
              className="rounded-lg shadow-sm w-full h-auto object-cover"/>
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
