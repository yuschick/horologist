export type TextElement =
    | 'abbr'
    | 'b'
    | 'bdi'
    | 'bdo'
    | 'big'
    | 'blockquote'
    | 'caption'
    | 'cite'
    | 'dd'
    | 'del'
    | 'dfn'
    | 'dl'
    | 'dt'
    | 'em'
    | 'figcaption'
    | 'i'
    | 'ins'
    | 'kbd'
    | 'legend'
    | 'mark'
    | 'output'
    | 'p'
    | 'pre'
    | 'q'
    | 'rp'
    | 'rt'
    | 'ruby'
    | 's'
    | 'samp'
    | 'small'
    | 'span'
    | 'strong'
    | 'sub'
    | 'sup'
    | 'time'
    | 'u'
    | 'var'
    | 'wbr';

export const blockLevelTextElements: TextElement[] = [
    'blockquote',
    'dd',
    'dl',
    'dt',
    'figcaption',
    'p',
];

export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';