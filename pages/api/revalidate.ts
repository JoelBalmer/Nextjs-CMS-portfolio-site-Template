import { NextApiRequest, NextApiResponse } from "next";
import { getPages } from "../../src/api/contentful/contentful-helper";
import { formatUrl } from "../../src/utils/string-helper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.secret !== process.env.REVALIDATE_WEBHOOK_SECRET) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const allPages = await getPages({ includeCustomPages: true });
    const allUrls = allPages.map(page => formatUrl(page.urlPath));
 
    const attempts: { [url: string]: boolean } = {};
    for (const url of allUrls) {
        attempts[url] = await tryRevalidateUrl(url, res);
    }

    return res.status(200).json(attempts);
}

const tryRevalidateUrl = async (url: string, res: NextApiResponse) => {
    try {
        await res.revalidate(url);
        return true;
    } catch (err) {
        console.log(`Error revaluating: ${err}`);
        return false;
    }
}