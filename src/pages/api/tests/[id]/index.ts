import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { testValidationSchema } from 'validationSchema/tests';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.test
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTestById();
    case 'PUT':
      return updateTestById();
    case 'DELETE':
      return deleteTestById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTestById() {
    const data = await prisma.test.findFirst(convertQueryToPrismaUtil(req.query, 'test'));
    return res.status(200).json(data);
  }

  async function updateTestById() {
    await testValidationSchema.validate(req.body);
    const data = await prisma.test.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTestById() {
    const data = await prisma.test.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
