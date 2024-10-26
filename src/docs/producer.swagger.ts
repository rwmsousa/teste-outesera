// src/docs/producer.swagger.ts

/**
 * @swagger
 * /producers:
 *   get:
 *     summary: Returns the producers with the shortest and longest intervals between awards
 *     responses:
 *       200:
 *         description: List of producers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 min:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       producer:
 *                         type: string
 *                       interval:
 *                         type: integer
 *                       previousWin:
 *                         type: integer
 *                       followingWin:
 *                         type: integer
 *                 max:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       producer:
 *                         type: string
 *                       interval:
 *                         type: integer
 *                       previousWin:
 *                         type: integer
 *                       followingWin:
 *                         type: integer
 *       500:
 *         description: Internal server error
 */
