import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { renamedclassValidationSchema } from 'validationSchema/renamedclasses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getRenamedclasses();
    case 'POST':
      return createRenamedclass();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRenamedclasses() {
    const data = await prisma.renamedclass
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'renamedclass'));
    return res.status(200).json(data);
  }

  async function createRenamedclass() {
    await renamedclassValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.attendance?.length > 0) {
      const create_attendance = body.attendance;
      body.attendance = {
        create: create_attendance,
      };
    } else {
      delete body.attendance;
    }
    if (body?.test?.length > 0) {
      const create_test = body.test;
      body.test = {
        create: create_test,
      };
    } else {
      delete body.test;
    }
    if (body?.video?.length > 0) {
      const create_video = body.video;
      body.video = {
        create: create_video,
      };
    } else {
      delete body.video;
    }
    const data = await prisma.renamedclass.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
