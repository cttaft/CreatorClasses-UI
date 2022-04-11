import type { NextApiRequest, NextApiResponse } from 'next'


type Subscriber = {
    subscriberId: number,
    email: string
  }
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Array<Subscriber>>
  ) {
    res.status(200).json([{email: 'taft.charlie@gmail.com', subscriberId :1234}]);
  }
  