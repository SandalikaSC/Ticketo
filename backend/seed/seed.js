const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const userData = [
        {
            id: '1',
            nic: '200064703151',
            email: 'sandalikachamari@gmail.com',
            dob: new Date('2000-05-26T18:00:00.000Z'),
            password: '$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO',
            firstName: 'sandalika',
            lastName: 'chamari',
            loginStatus: false,
            accountStatus: true,
            registeredDate: new Date('2023-08-08T07:31:11.537Z'),
            mobileNumber: '0779232261',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzMGFkZThlLWJjMDEtNDk3Yi1hNTE2LTllM2IyYWExZTQ3NCIsImVtYWlsIjoic2FuZGFsaWthY2hhbWFyaUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6WyJQQVNTRU5HRVIiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1MTY4MjEsImV4cCI6MTY5MjEyMTYyMX0.tCSRNMoAcGufRlHeLgsC8hO1el23cGX6_vSYotD8D6E',
            otp: '',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDMwYWRlOGUtYmMwMS00OTdiLWE1MTYtOWUzYjJhYTFlNDc0IiwibmljIjoiMjAwMDY0NzAzMTUxIiwiZW1haWwiOiJzYW5kYWxpa2FjaGFtYXJpQGdtYWlsLmNvbSIsImRvYiI6IjIwMDAtMDUtMjZUMTg6MDA6MDAuMDAwWiIsInBhc3N3b3JkIjoiJDJiJDEwJEpUZ2RCR0QuNExwU2Exc0N1RG4xbE9HVXhVYms5Y3ExL050cnJ0T3RubVJrandxWkk4V21PIiwiZmlyc3ROYW1lIjoic2FuZGFsaWthICIsImxhc3ROYW1lIjoiY2hhbWFyaSAiLCJsb2dpblN0YXR1cyI6ZmFsc2UsImFjY291bnRTdGF0dXMiOnRydWUsInJlZ2lzdGVyZWREYXRlIjoiMjAyMy0wOC0wOFQwNzozMToxMS41MzdaIiwibW9iaWxlTnVtYmVyIjoiMDc3OTIzMjI2MSIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SW1Rek1HRmtaVGhsTFdKak1ERXRORGszWWkxaE5URTJMVGxsTTJJeVlXRXhaVFEzTkNJc0luVnpaWEpVZVhCbElqcGJJbEJCVTFORlRrZEZVaUpkTENKMGVYQmxJam9pY21WbWNtVnphQ0lzSW1saGRDSTZNVFk1TVRVd01qWTRNU3dpWlhod0lqb3hOamt5TVRBM05EZ3hmUS52UXFmM0pBbUJtS1FlVGV4MWpicVliX2JHWjFmTFpWa0pRdERUckRBWk5ZIiwib3RwIjoiIiwiYWNjZXNzVG9rZW4iOiIiLCJvdHBHZW5lcmF0ZVRpbWUiOm51bGwsInVzZXJUeXBlIjpbIlBBU1NFTkdFUiJdfSwiaWF0IjoxNjkxNTE2ODIxLCJleHAiOjE2OTE1MjQwMjF9.93_hG1cGGcsAZGuKPtDB1iWZg3C2tvyrNEB6UFCzgGg',
            otpGenerateTime: null,
            userType: ['PASSENGER'],
        },

        {
            id: '2',
            nic: '996523250V',
            email: 'savanihasadara@gmail.com',
            dob: new Date('2000-05-26T18:00:00.000Z'),
            password: '$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO',
            firstName: 'Savani',
            lastName: 'Hasadara',
            loginStatus: false,
            accountStatus: true,
            registeredDate: new Date('2023-08-08T07:31:11.537Z'),
            mobileNumber: '0761004812',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzMGFkZThlLWJjMDEtNDk3Yi1hNTE2LTllM2IyYWExZTQ3NCIsImVtYWlsIjoic2FuZGFsaWthY2hhbWFyaUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6WyJQQVNTRU5HRVIiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1MTY4MjEsImV4cCI6MTY5MjEyMTYyMX0.tCSRNMoAcGufRlHeLgsC8hO1el23cGX6_vSYotD8D6E',
            otp: '',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDMwYWRlOGUtYmMwMS00OTdiLWE1MTYtOWUzYjJhYTFlNDc0IiwibmljIjoiMjAwMDY0NzAzMTUxIiwiZW1haWwiOiJzYW5kYWxpa2FjaGFtYXJpQGdtYWlsLmNvbSIsImRvYiI6IjIwMDAtMDUtMjZUMTg6MDA6MDAuMDAwWiIsInBhc3N3b3JkIjoiJDJiJDEwJEpUZ2RCR0QuNExwU2Exc0N1RG4xbE9HVXhVYms5Y3ExL050cnJ0T3RubVJrandxWkk4V21PIiwiZmlyc3ROYW1lIjoic2FuZGFsaWthICIsImxhc3ROYW1lIjoiY2hhbWFyaSAiLCJsb2dpblN0YXR1cyI6ZmFsc2UsImFjY291bnRTdGF0dXMiOnRydWUsInJlZ2lzdGVyZWREYXRlIjoiMjAyMy0wOC0wOFQwNzozMToxMS41MzdaIiwibW9iaWxlTnVtYmVyIjoiMDc3OTIzMjI2MSIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SW1Rek1HRmtaVGhsTFdKak1ERXRORGszWWkxaE5URTJMVGxsTTJJeVlXRXhaVFEzTkNJc0luVnpaWEpVZVhCbElqcGJJbEJCVTFORlRrZEZVaUpkTENKMGVYQmxJam9pY21WbWNtVnphQ0lzSW1saGRDSTZNVFk1TVRVd01qWTRNU3dpWlhod0lqb3hOamt5TVRBM05EZ3hmUS52UXFmM0pBbUJtS1FlVGV4MWpicVliX2JHWjFmTFpWa0pRdERUckRBWk5ZIiwib3RwIjoiIiwiYWNjZXNzVG9rZW4iOiIiLCJvdHBHZW5lcmF0ZVRpbWUiOm51bGwsInVzZXJUeXBlIjpbIlBBU1NFTkdFUiJdfSwiaWF0IjoxNjkxNTE2ODIxLCJleHAiOjE2OTE1MjQwMjF9.93_hG1cGGcsAZGuKPtDB1iWZg3C2tvyrNEB6UFCzgGg',
            otpGenerateTime: null,
            userType: ['CONTROL_CENTRE'],
        },

        {
            id: '3',
            nic: "997791550V",
            email: "nadeedarshika1999@gmail.com",
            dob: new Date('2001-02-16T18:00:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "Nadee",
            lastName: "Darshika",
            loginStatus: false,
            accountStatus: true,
            registeredDate: new Date('2023-08-04T15:30:31.785Z'),
            mobileNumber: "0763850138",
            token: "",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["DRIVER"],
        }, {
            id: '4',
            nic: "996740099V",
            email: "kaveeshagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kaveesha",
            lastName: "gimhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["TICKET_CHECKER"],
        },
        {
            id: '5',
            nic: "999640099V",
            email: "kavshcecewfagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kaveesha",
            lastName: "gimhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["TICKET_CLERK"],
        },
        {
            id: '6',
            nic: "996745099V",
            email: "sanhagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kdsdsaaveesha",
            lastName: "gimhdasdasdani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["STATION_MASTER"],
        },
        {
            id: '7',
            nic: "996780099V",
            email: "kaDWDWQDQW@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kaveDWQDWQesha",
            lastName: "giDWQDWmhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["TICKET_CHECKER"],
        },
        {
            id: '8',
            nic: "996747899V",
            email: "DSDWDWQDgw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kASCSACDAaveesha",
            lastName: "giASASAmhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["DRIVER"],
        },
        {
            id: '9',
            nic: "996740159V",
            email: "kaveWDWQDWQDWQDeshagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kavDQWDWQDeesha",
            lastName: "gimWDWQDQWhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["TICKET_CHECKER"],
        },
        {
            id: '10',
            nic: "996440099V",
            email: "kaDWQDWQDWveeshagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kaveesQWDWQha",
            lastName: "gimhaniWQDWQD",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["STATION_MASTER"],
        },
        {
            id: '11',
            nic: "996715099V",
            email: "kaveeshagwASDSAD@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kaveesha",
            lastName: "gimhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["TICKET_CLERK"],
        },
        {
            id: '12',
            nic: "996748899V",
            email: "kaveeSAsASshagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kaveesha",
            lastName: "gimhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["TICKET_CLERK"],
        },
        {
            id: '13',
            nic: "996742299V",
            email: "kaveeshDWDQWWFagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kaveeshWdWDWda",
            lastName: "gdadwddimhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["STATION_MASTER"],
        },
        {
            id: '14',
            nic: "996950099V",
            email: "kaveesFFQWFhagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kFWQFQWFaveesha",
            lastName: "gEFEFQWFimhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["DRIVER"],
        },
        {
            id: '15',
            nic: "995340099V",
            email: "kWDWQDQWaveeshDagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "WWWDWDkaveesha",
            lastName: "WGVBBBSDgimhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["DRIVER"],
        }, {
            id: '16',
            nic: "997000510v",
            email: "paridew99@gmail.com",
            dob: new Date('1999-07-18T00:00:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "Parindi",
            lastName: "Dewmini",
            loginStatus: false,
            accountStatus: true,
            registeredDate: new Date('2023-08-02T18:01:26.384Z'),
            mobileNumber: "0765848013",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VyVHlwZSI6WyJBRE1JTiJdLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTY5MTU2Mzg2NiwiZXhwIjoxNjkyMTY4NjY2fQ.gEwxAcO8BtGpCjekib1iN_nof5hpoxBmQTQ3K84CB0U",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["ADMIN"],
        },
    ];
    for (const data of userData) {
        await prisma.user.create({
            data
        });
    }

    const wallets = [
        {
            userId: "1",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 300)
        },
        {
            userId: "2",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "3",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "4",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "5",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "6",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "7",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "8",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "9",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "10",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "11",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "12",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "13",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "14",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "15",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        },
        {
            userId: "16",
            walletBalance: getRandomFloat(500, 4000),
            holdValue: getRandomFloat(100, 400)
        }

    ];
    for (const data of wallets) {
        await prisma.Wallet.create({
            data
        });
    }
    const stationData = [
        {
            name: 'Maradana',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Colombo Fort',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Secretariat Halt',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Slave Island',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kollupitiya',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Bambalapitiya',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Wellawatte',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Mount Laviniya',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Rathmalana',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Angulana',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Lunawa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Moratuwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Koralawella',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Egoda Uyana',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Panadura',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Pinwatte',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Wadduwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Train Halt 01',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kaluthara North',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kaluthara South',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Katukurunda',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Payagala North',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Payagala South',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Maggona',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Beruwala',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Hettimulla',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Aluthgama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Bentota',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Induruwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Maha Induruwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kosgoda',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Piyagama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Ahungalle',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Patagamgoda',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Balapitiya',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Andadola',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kandegoda',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Ambalangoda',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Madampagama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Akurala',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kahawa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Telwatte',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Seenigama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Hikkaduwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Thirangama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kumarakanda',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Dodanduwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Rathgama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Boossa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Ginthota',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Piyadigama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Richmond Hill',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Galle',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Katugoda',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Unawatuna',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Talpe',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Habaraduwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Koggala',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kathaluwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Ahangama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Midigama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kumbalgama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Weligama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Polwathumodara',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Mirissa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kamburugamuwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Walgama',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Matara',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Piliduwa',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Weherahena',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Kekanadura',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Bambaranda',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Wewurukannala',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        {
            name: 'Beliatta',
            latitude: 7.9191593978269585,
            longitude: 7.9191593978269585,
            contactNumber: '0253891292',
        },
        // Add more station data here...
    ];

    for (const data of stationData) {
        await prisma.station.create({
            data
        });
    }
    const employeedata = [

        {

            Employee: { connect: { id: userData[1].id } },
            station: { connect: { stationId: 5 } },
        },
        {
            Employee: { connect: { id: userData[2].id } },
            station: { connect: { stationId: 8 } },
        },

        {
            Employee: { connect: { id: userData[3].id } },
            station: { connect: { stationId: 10 } },
        },
        {
            Employee: { connect: { id: userData[4].id } },
            station: { connect: { stationId: 7 } },
        },
        {
            Employee: { connect: { id: userData[5].id } },
            station: { connect: { stationId: 15 } },
        },
        {
            Employee: { connect: { id: userData[6].id } },
            station: { connect: { stationId: 16 } },
        },
        {
            Employee: { connect: { id: userData[7].id } },
            station: { connect: { stationId: 18 } },
        },
        {
            Employee: { connect: { id: userData[8].id } },
            station: { connect: { stationId: 21 } },
        },
        {
            Employee: { connect: { id: userData[9].id } },
            station: { connect: { stationId: 1 } },
        },
        {
            Employee: { connect: { id: userData[10].id } },
            station: { connect: { stationId: 30 } },
        },
        {
            Employee: { connect: { id: userData[11].id } },
            station: { connect: { stationId: 19 } },
        },
        {
            Employee: { connect: { id: userData[12].id } },
            station: { connect: { stationId: 20 } },
        },
        {
            Employee: { connect: { id: userData[13].id } },
            station: { connect: { stationId: 13 } },
        },

    ];
    for (const data of employeedata) {
        await prisma.Employee.create({
            data
        });
    }



    const trainData = [
        {
            trainName: 'Ruhunu Kumari',
            trainNumber: '8058',
        },
        {
            trainName: 'Sagarika',
            trainNumber: '8096',
        },
        {
            trainName: 'Galu Kumari',
            trainNumber: '8056',
        },
        {
            trainName: 'Dakshina Intercity Express',
            trainNumber: '8054',
        },

        {
            trainName: 'Rajarata Rejini',
            trainNumber: '4086',
        },
        {
            trainName: 'Samudra Devi',
            trainNumber: '8327',
        },
        {
            trainName: 'Night Mail',
            trainNumber: '8775',
        },

        {
            trainName: '8050',
            trainNumber: '8050',
        },
        {
            trainName: '8051',
            trainNumber: '8051',
        },
        {
            trainName: '8064',
            trainNumber: '8064',
        },
        {
            trainName: '8060',
            trainNumber: '8060',
        },
        {
            trainName: '8076',
            trainNumber: '8076',
        },
        {
            trainName: '8764',
            trainNumber: '8764',
        },
        {
            trainName: '8320',
            trainNumber: '8320',
        },
        {
            trainName: '8742',
            trainNumber: '8742',
        },
        // Add more train data...
    ];

    for (const data of trainData) {
        await prisma.train.create({
            data,
        });
    }


    const scheduleData = [
        {
            startTime: new Date('2023-08-15 15:40:00'),
            endTime: new Date('2023-08-15 18:21:00'),
            start: 1, // Replace with the actual start stationId
            end: 68,   // Replace with the actual end stationId
            driverId: '6',
            trainId: 1, // Replace with the actual trainId
            WorkingDays: ['WEEKDAYS', 'WEEKENDS'],
            notWorking: ['HOLIDAY'],
        },
        {
            startTime: new Date('2023-08-16 06:05:00'),
            endTime: new Date('2023-08-16 08:49:00'),
            start: 68, // Replace with the actual start stationId
            end: 1,   // Replace with the actual end stationId
            driverId: '7',
            trainId: 2, // Replace with the actual trainId
            WorkingDays: ['WEEKDAYS'],
            notWorking: ['SUNDAY'],
        },
        {
            startTime: new Date('2023-08-16 05:25:00'),
            endTime: new Date('2023-08-16 09:47:00'),
            start: 74, // Replace with the actual start stationId
            end: 1,   // Replace with the actual end stationId
            driverId: '15',
            trainId: 3, // Replace with the actual trainId
            WorkingDays: ['WEEKDAYS'],
            notWorking: ['SUNDAY'],
        },
        // Add more schedule data...
    ];

    for (const data of scheduleData) {
        await prisma.schedule.create({
            data,
        });
    }

    // Seed StationSchedule data
    const stationScheduleData = [
        {
            arrivalTime: new Date('2023-08-15 15:40:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-15 15:40:00'),
            delayTime: 0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 1,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 15:44:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 15:50:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 2,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 16:31:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 16:33:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 20,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 16:47:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 16:48:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 27,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 16:57:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 16:58:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 31,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 17:08:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 17:09:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 38,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 17:19:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 17:20:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 44,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 17:34:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 17:40:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 53,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 17:59:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 18:00:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 60,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 18:07:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 18:08:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 63,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 18:20:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 18:20:00'),
            delayTime: 0.0,
            scheduleId: 1, // Replace with the actual scheduleId
            stationId: 68,  // Replace with the actual stationId
        },

        //RUHUNU KUMARI MATARA TO MARADANA
        {
            arrivalTime: new Date('2023-08-16 06:05:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:05:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 68,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:20:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:21:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 63,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:30:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:31:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 60,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:38:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:39:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 57,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:53:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:03:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 53,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:11:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:12:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 44,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:22:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:23:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 38,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:46:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:47:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 27,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:51:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:53:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 31,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 08:19:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 08:21:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 20,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 08:43:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 08:45:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 2,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 08:49:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 08:49:00'),
            delayTime: 0.0,
            scheduleId: 2, // Replace with the actual scheduleId
            stationId: 1,  // Replace with the actual stationId
        },


        //Galu Kumari Beliatta to Maradana
        {
            arrivalTime: new Date('2023-08-16 05:25:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 05:25:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 74,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 05:36:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 05:37:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 73,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 05:41:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 05:42:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 72,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 05:48:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 05:49:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 71,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 05:52:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 05:53:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 70,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:00:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:12:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 68,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:16:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:17:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 67,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:20:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:21:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 66,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:25:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:26:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 65,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:29:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:30:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 64,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:34:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:35:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 63,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:39:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:40:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 62,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:42:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:43:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 61,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:47:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:48:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 60,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:52:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:53:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 59,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:56:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 06:57:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 58,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 06:59:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:00:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 57,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:03:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:04:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 56,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:09:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:10:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 55,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:12:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:13:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 54,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:19:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:27:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 53,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:44:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:45:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 44,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 07:56:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 07:57:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 38,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 08:06:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 08:07:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 33,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 08:19:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 08:20:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 28,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 08:23:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 08:24:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 27,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 08:43:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 08:45:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 20,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 09:01:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 09:03:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 15,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 09:12:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 09:13:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 12,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 09:22:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 09:23:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 8,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 09:40:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 09:42:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 2,  // Replace with the actual stationId
        },
        {
            arrivalTime: new Date('2023-08-16 09:47:00'),
            waitingTime: 0.0,
            departureTime: new Date('2023-08-16 09:47:00'),
            delayTime: 0.0,
            scheduleId: 3, // Replace with the actual scheduleId
            stationId: 1,  // Replace with the actual stationId
        },
        // Add more station schedule data...
    ];

    for (const data of stationScheduleData) {
        await prisma.stationSchedule.create({
            data,
        });
    }









    const classData = [
        { className: 'THIRD_CLASS_RESERVED', code: 'TCR' },
        { className: 'THIRD_CLASS_NOT_RESERVED', code: 'TC' },
        { className: 'FIRST_CLASS_AC', code: 'FC' },
        { className: 'FIRST_CLASS_RESERVED', code: 'FCR' },
        { className: 'OBSERVATION_CLASS', code: 'OFV' },
        { className: 'SLEEPER_CLASS', code: 'SLEEP' },
        { className: 'SECOND_CLASS_RESERVED', code: 'SCR' },
        { className: 'SECOND_CLASS_NOT_RESERVED', code: 'SC' },
        // Add more class data here...
    ];


    for (const data of classData) {
        await prisma.class.create({
            data,
        });
    }

    const coachData = [
        { coachCode: 'TC5', seatCapacity: 48, seatArrangement: 5, classId: 2, reservable: false },
        { coachCode: 'TC2', seatCapacity: 48, seatArrangement: 2, classId: 2, reservable: false },
        { coachCode: 'TCR5', seatCapacity: 48, seatArrangement: 5, classId: 1, reservable: true },
        { coachCode: 'TCR4', seatCapacity: 48, seatArrangement: 4, classId: 1, reservable: true },
        { coachCode: 'FC4', seatCapacity: 48, seatArrangement: 4, classId: 3, reservable: true },
        { coachCode: 'OFV4', seatCapacity: 48, seatArrangement: 4, classId: 5, reservable: true },
        { coachCode: 'SLEEP4', seatCapacity: 48, seatArrangement: 4, classId: 6, reservable: true },
        { coachCode: 'SCR4', seatCapacity: 48, seatArrangement: 4, classId: 7, reservable: true },
        { coachCode: 'SC4', seatCapacity: 48, seatArrangement: 4, classId: 8, reservable: false },
        // Add more coach data here...
    ];

    for (const data of coachData) {
        await prisma.coach.create({
            data,
        });
    }


    const uniqueStationPairs = generateUniqueStationPairs(stationData);

    function generateUniqueStationPairs(stationData) {
        const stationPairs = [];

        for (let i = 1; i <= stationData.length; i++) {
            for (let j = i + 1; j < stationData.length; j++) {
                stationPairs.push({ start: i, end: j });
            }
        }

        return stationPairs;
    }

    const dummyJourneyPrices = uniqueStationPairs.map(({ start, end }) => ({
        start: start,
        end: end,
        firstClass: getRandomFloat(1000, 2000),
        secondClass: getRandomFloat(500, 1200),
        thirdClass: getRandomFloat(100, 500),
        govenmentSecond: getRandomFloat(1000, 2600),
        govenmentThird: getRandomFloat(500, 1900),
        privateSecond: getRandomFloat(2000, 3600),
        privateThird: getRandomFloat(1000, 2000),
    }));

    for (const data of dummyJourneyPrices) {
        await prisma.Journey.create({
            data,
        });
    }


    function getRandomFloat(min, max) {
        return parseFloat(((Math.random() * (max - min)) + min).toFixed(2));;
    }

    // Rest of the code remains the same

}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });