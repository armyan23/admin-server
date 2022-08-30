// //FAKE DATA
interface IUsers {
    userId: {
        password: String
        login: String
        id: Number
        username: String
        email: String
        name: String
        state: String
        avatar_url: String
        web_url: String
        created_at: String
        is_admin: Boolean
        bio: String
        location: String | null
        skype: String
        linkedin: String
        twitter: String
        website_url: String
        organization: String
        job_title: String
        last_sign_in_at: String
        confirmed_at: String
        theme_id: Number
        last_activity_on: String
        color_scheme_id: Number
        projects_limit: Number
        current_sign_in_at: String
        note: String
        can_create_group: Boolean
        can_create_project: Boolean
        two_factor_enabled: Boolean
        external: Boolean
        private_profile: Boolean
        current_sign_in_ip: String
        last_sign_in_ip: String
        namespace_id: Number
    },
}

// export const users: IUsers[] = [
//     { username: "aaa", id: 1 },
//     { username: "bbbb", id: 2 },
//     { username: "adsd", id: 3 },
//     { username: "cc", id: 4 },
// ];

export const users: IUsers = {
    userId: {
        password: "123456",
        login: "userId",
        id: 1,
        username: "john_smith",
        email: "john@example.com",
        name: "John Smith",
        state: "active",
        avatar_url: "http://localhost:3000/uploads/user/avatar/1/index.jpg",
        web_url: "http://localhost:3000/john_smith",
        created_at: "2012-05-23T08:00:58Z",
        is_admin: false,
        bio: "",
        location: null,
        skype: "",
        linkedin: "",
        twitter: "",
        website_url: "",
        organization: "",
        job_title: "",
        last_sign_in_at: "2012-06-01T11:41:01Z",
        confirmed_at: "2012-05-23T09:05:22Z",
        theme_id: 1,
        last_activity_on: "2012-05-23",
        color_scheme_id: 2,
        projects_limit: 100,
        current_sign_in_at: "2012-06-02T06:36:55Z",
        note: "DMCA Request: 2018-11-05 | DMCA Violation | Abuse | https://gitlab.zendesk.com/agent/tickets/123",
        // identities: [
        //     { provider: "github", "extern_uid": "2435223452345" },
        //     { provider: "bitbucket", "extern_uid": "john.smith" },
        //     { provider: "google_oauth2", "extern_uid": "8776128412476123468721346" }
        // ],
        can_create_group: true,
        can_create_project: true,
        two_factor_enabled: true,
        external: false,
        private_profile: false,
        current_sign_in_ip: "196.165.1.102",
        last_sign_in_ip: "172.127.2.22",
        namespace_id: 1
    },
}