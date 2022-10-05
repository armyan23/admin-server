'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // CREATED USER
        // await queryInterface.bulkInsert(
        //     'users',
        //     [
        //         {
        //             id:  "6d9cd6ac-a089-4cce-992b-18eb544328bf",
        //             name: 'user1',
        //             email: 'user1@test.com',
        //             password: "55",
        //             create_at: new Date(),
        //             updated_at: new Date()
        //         },
        //         {
        //             id: "faf96fb7-27e4-447e-98ed-c670ce1785d4",
        //             name: 'user2',
        //             email: 'user2@test.com',
        //             password: "55",
        //             create_at: new Date(),
        //             updated_at: new Date()
        //
        //         },
        //         {
        //             id: "40191fde-d784-4ddb-842f-bff0286d8cef",
        //             name: 'user3',
        //             email: 'user3@test.com',
        //             password: "55",
        //             create_at: new Date(),
        //             updated_at: new Date()
        //         },
        //     ],
        //     {}
        // );
        await queryInterface.bulkInsert(
            'gender',
            [
                {
                    id: 1,
                    type: "male"
                },
                {
                    id: 2,
                    type: "female"
                },
            ],
            {}
        );
        //
        // await queryInterface.bulkInsert(
        //     'video',
        //     [
        //         {
        //             id: 1,
        //             title: 'video1ByUser1',
        //             channel_id: 1,
        //             create_at: new Date(),
        //             updated_at: new Date(),
        //         },
        //         {
        //             id: 2,
        //             title: 'video2ByUser1',
        //             channel_id: 1,
        //             create_at: new Date(),
        //             updated_at: new Date(),
        //         },
        //         {
        //             id: 3,
        //             title: 'video3ByUser2',
        //             channel_id: 2,
        //             create_at: new Date(),
        //             updated_at: new Date(),
        //         },
        //     ],
        //     {}
        // );
    },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
