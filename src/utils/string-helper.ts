export const formatUrl = (urlPath: string): string => {
    if (urlPath === '/') {
      return '/';
    }
    
    return urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
};

export const getWebsiteOwnerName = process.env.NEXT_PUBLIC_WEBSITE_OWNER_NAME?.replace('_', ' ');