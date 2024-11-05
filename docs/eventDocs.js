/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     summary: Create an event
 *     security:
 *       - Authorization: []
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               isPublicHoliday:
 *                 type: boolean
 *               isPrivate:
 *                 type: boolean
 *               receivers:
 *                 type: array
 *                 items:
 *                   type: String
 *           example:
 *             {
 *               "name": "Farmer's Day",
 *               "date": "2024-12-06",
 *               "description": "Annual celebration of farmers and fishermen",
 *               "isPublicHoliday": false,
 *               "isPrivate": false,
 *               "receivers": ["andyansong@gmail.com"]
 *             }
 *     responses:
 *       201:
 *         description: Event has been created successfully
 *       401:
 *         description: Unauthorized, user must log in
 *       500:
 *         description: There was an error creating event
 */

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Get all Events
 *     security:
 *       - Authorization: []
 *     tags: [Event]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Name of event to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         description: How to sort events
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page to fetch
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Number of events to fetch
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Unauthorized, user must log in
 *       500:
 *         description: There was a problem retrieving events
 */

/**
 * @swagger
 * /api/v1/events/{id}:
 *   patch:
 *     summary: Update an event
 *     security:
 *       - Authorization: []
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               isPublicHoliday:
 *                 type: boolean
 *               isPrivate:
 *                 type: boolean
 *           example:
 *             {
 *               "name": "Farmer's Day",
 *               "date": "2024-12-06",
 *               "description": "Annual celebration of farmers and fishermen",
 *               "isPublicHoliday": false,
 *               "isPrivate": false
 *             }
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       401:
 *         description: Unauthorized, user must log in
 *       404:
 *         description: Event not found
 *       500:
 *         description: There was a problem updating the event
 */

/**
 * @swagger
 * /api/v1/events/{id}:
 *   delete:
 *     summary: Delete event by id
 *     security:
 *       - Authorization: []
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event id
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Unauthorized, user must log in
 *       404:
 *         description: Event not found
 *       500:
 *         description: There was a problem deleting the event
 */
