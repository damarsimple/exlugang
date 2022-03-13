// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Curseforge from 'node-curseforge';

type Data = {
  name: string
}

const SKEY = "$2a$10$r0OpRKUqI6P07tX2gTfWfuS4w9p6ZnDTKMRhudyCcnP8HmbDSf/Bm";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let cf = new Curseforge(SKEY);

  const dd: any[] = []

  let mc = await cf.get_game("minecraft");

  await cf.search_mods(mc, {
    pageSize
      : 10
  }).then(async (mods) => {
    for (let mod of mods) {
      dd.push({
        categories: mod.categories.map(e => e.name).join(","),
        name: mod.name,
        id: mod.id,
        url: mod.links,
        dl: await mod.get_files()
      })
    }
  });

  res.status(200).json({ dd } as any)

}
