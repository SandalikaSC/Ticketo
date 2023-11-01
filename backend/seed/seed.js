const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main()
{
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
    for (const data of userData)
    {
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
    for (const data of wallets)
    {
        await prisma.Wallet.create({
            data
        });
    }

    const stationData = [
        {
            name: 'Maradana',
            latitude: 6.92955,
            longitude: 79.86592,
            contactNumber: '0112695722',
        },
        {
            name: 'Colombo Fort',
            latitude: 6.93410,
            longitude: 79.84986,
            contactNumber: '0112434215',
        },
        {
            name: 'Secretariat Halt',
            latitude: 6.93226,
            longitude: 79.84606,
            contactNumber: '0000000000',
        },
        {
            name: 'Slave Island',
            latitude: 6.92420,
            longitude: 79.84937,
            contactNumber: '0000000000',
        },
        {
            name: 'Kollupitiya',
            latitude: 6.91133,
            longitude: 79.84834,
            contactNumber: '0000000000',
        },
        {
            name: 'Bambalapitiya',
            latitude: 6.89438,
            longitude: 79.85300,
            contactNumber: '0112584503',
        },
        {
            name: 'Wellawatte',
            latitude: 6.87524,
            longitude: 79.85749,
            contactNumber: '0000000000',
        },
        {
            name: 'Mount Lavinia',
            latitude: 6.83223,
            longitude: 79.86291,
            contactNumber: '0769127523',
        },
        {
            name: 'Rathmalana',
            latitude: 6.81558,
            longitude: 79.86704,
            contactNumber: '0112635271',
        },
        {
            name: 'Angulana',
            latitude: 6.79950,
            longitude: 79.87264,
            contactNumber: '0112605256',
        },
        {
            name: 'Lunawa',
            latitude: 6.78747,
            longitude: 79.87542,
            contactNumber: '0000000000',
        },
        {
            name: 'Moratuwa',
            latitude: 6.77486,
            longitude: 79.88193,
            contactNumber: '0112645264',
        },
        {
            name: 'Koralawella',
            latitude: 6.76276,
            longitude: 79.88528,
            contactNumber: '0000000000',
        },
        {
            name: 'Egoda Uyana',
            latitude: 6.74397,
            longitude: 79.89169,
            contactNumber: '0112657336',
        },
        {
            name: 'Panadura',
            latitude: 6.71291,
            longitude: 79.90455,
            contactNumber: '0000000000',
        },
        {
            name: 'Pinwatte',
            latitude: 6.68680,
            longitude: 79.91580,
            contactNumber: '0000000000',
        },
        {
            name: 'Wadduwa',
            latitude: 6.66270,
            longitude: 79.92861,
            contactNumber: '0382232571',
        },
        {
            name: 'Train Halt 01',
            latitude: 6.63304,
            longitude: 79.93940,
            contactNumber: '0000000000',
        },
        {
            name: 'Kaluthara North',
            latitude: 6.60134,
            longitude: 79.95419,
            contactNumber: '0000000000',
        },
        {
            name: 'Kaluthara South',
            latitude: 6.58415,
            longitude: 79.95903,
            contactNumber: '0342222271',
        },
        {
            name: 'Katukurunda',
            latitude: 6.56007,
            longitude: 79.96605,
            contactNumber: '0000000000',
        },
        {
            name: 'Payagala North',
            latitude: 6.53159,
            longitude: 79.97502,
            contactNumber: '0000000000',
        },
        {
            name: 'Payagala South',
            latitude: 6.52167,
            longitude: 79.97887,
            contactNumber: '0342233760',
        },
        {
            name: 'Maggona',
            latitude: 6.50480,
            longitude: 79.98140,
            contactNumber: '0000000000',
        },
        {
            name: 'Beruwala',
            latitude: 6.47699,
            longitude: 79.98359,
            contactNumber: '0342276371',
        },
        {
            name: 'Hettimulla',
            latitude: 6.45808,
            longitude: 79.99077,
            contactNumber: '0000000000',
        },
        {
            name: 'Aluthgama',
            latitude: 6.43296,
            longitude: 80.00024,
            contactNumber: '0342275282',
        },
        {
            name: 'Bentota',
            latitude: 6.42216,
            longitude: 79.99663,
            contactNumber: '0000000000',
        },
        {
            name: 'Induruwa',
            latitude: 6.38751,
            longitude: 80.00859,
            contactNumber: '0000000000',
        },
        {
            name: 'Maha Induruwa',
            latitude: 6.36427,
            longitude: 80.01400,
            contactNumber: '0000000000',
        },
        {
            name: 'Kosgoda',
            latitude: 6.33845,
            longitude: 80.02945,
            contactNumber: '0000000000',
        },
        {
            name: 'Piyagama',
            latitude: 6.32749,
            longitude: 80.03407,
            contactNumber: '0000000000',
        },
        {
            name: 'Ahungalle',
            latitude: 6.31267,
            longitude: 80.03763,
            contactNumber: '0000000000',
        },
        {
            name: 'Patagamgoda',
            latitude: 6.29637,
            longitude: 80.04165,
            contactNumber: '0000000000',
        },
        {
            name: 'Balapitiya',
            latitude: 6.27663,
            longitude: 80.04340,
            contactNumber: '0000000000',
        },
        {
            name: 'Andadola',
            latitude: 6.26611,
            longitude: 80.04698,
            contactNumber: '0000000000',
        },
        {
            name: 'Kandegoda',
            latitude: 6.25015,
            longitude: 80.05295,
            contactNumber: '0000000000',
        },
        {
            name: 'Ambalangoda',
            latitude: 6.23533,
            longitude: 80.05496,
            contactNumber: '0912258271',
        },
        {
            name: 'Madampagama',
            latitude: 6.21267,
            longitude: 80.06109,
            contactNumber: '0000000000',
        },
        {
            name: 'Akurala',
            latitude: 6.19207,
            longitude: 80.06487,
            contactNumber: '0000000000',
        },
        {
            name: 'Kahawa',
            latitude: 6.18324,
            longitude: 80.07395,
            contactNumber: '0000000000',
        },
        {
            name: 'Telwatte',
            latitude: 6.16912,
            longitude: 80.08897,
            contactNumber: '0000000000',
        },
        {
            name: 'Seenigama',
            latitude: 6.15876,
            longitude: 80.09474,
            contactNumber: '0000000000',
        },
        {
            name: 'Hikkaduwa',
            latitude: 6.14219,
            longitude: 80.10008,
            contactNumber: '0000000000',
        },
        {
            name: 'Thirangama',
            latitude: 6.12224,
            longitude: 80.11444,
            contactNumber: '0000000000',
        },
        {
            name: 'Kumarakanda',
            latitude: 6.11234,
            longitude: 80.12423,
            contactNumber: '0000000000',
        },
        {
            name: 'Dodanduwa',
            latitude: 6.09830,
            longitude: 80.13283,
            contactNumber: '0912264279',
        },
        {
            name: 'Rathgama',
            latitude: 6.09332,
            longitude: 80.13996,
            contactNumber: '0000000000',
        },
        {
            name: 'Boossa',
            latitude: 6.07398,
            longitude: 80.16105,
            contactNumber: '0000000000',
        },
        {
            name: 'Ginthota',
            latitude: 6.06072,
            longitude: 80.17936,
            contactNumber: '0912234272',
        },
        {
            name: 'Piyadigama',
            latitude: 6.05366,
            longitude: 80.19084,
            contactNumber: '0000000000',
        },
        {
            name: 'Richmond Hill',
            latitude: 6.05394,
            longitude: 80.20466,
            contactNumber: '0000000000',
        },
        {
            name: 'Galle',
            latitude: 6.03335,
            longitude: 80.21435,
            contactNumber: '0912232271',
        },
        {
            name: 'Katugoda',
            latitude: 6.03270,
            longitude: 80.24011,
            contactNumber: '0000000000',
        },
        {
            name: 'Unawatuna',
            latitude: 6.02203,
            longitude: 80.24912,
            contactNumber: '0000000000',
        },
        {
            name: 'Talpe',
            latitude: 5.99849,
            longitude: 80.28009,
            contactNumber: '0000000000',
        },
        {
            name: 'Habaraduwa',
            latitude: 5.99406,
            longitude: 80.30728,
            contactNumber: '0000000000',
        },
        {
            name: 'Koggala',
            latitude: 5.98600,
            longitude: 80.33163,
            contactNumber: '0000000000',
        },
        {
            name: 'Kathaluwa',
            latitude: 5.98357,
            longitude: 80.33796,
            contactNumber: '0000000000',
        },
        {
            name: 'Ahangama',
            latitude: 5.97321,
            longitude: 80.36383,
            contactNumber: '0912283271',
        },
        {
            name: 'Midigama',
            latitude: 5.96519,
            longitude: 80.39149,
            contactNumber: '0000000000',
        },
        {
            name: 'Kumbalgama',
            latitude: 5.96360,
            longitude: 80.40964,
            contactNumber: '0000000000',
        },
        {
            name: 'Weligama',
            latitude: 5.97564,
            longitude: 80.42962,
            contactNumber: '0412250271',
        },
        {
            name: 'Polwathumodara',
            latitude: 5.96428,
            longitude: 80.45740,
            contactNumber: '0000000000',
        },
        {
            name: 'Mirissa',
            latitude: 5.95684,
            longitude: 80.47336,
            contactNumber: '0000000000',
        },
        {
            name: 'Kamburugamuwa',
            latitude: 5.94353,
            longitude: 80.49579,
            contactNumber: '0000000000',
        },
        {
            name: 'Walgama',
            latitude: 5.94546,
            longitude: 80.51417,
            contactNumber: '0000000000',
        },
        {
            name: 'Matara',
            latitude: 5.95181,
            longitude: 80.54352,
            contactNumber: '0000000000',
        },
        {
            name: 'Piliduwa',
            latitude: 5.95369,
            longitude: 80.55665,
            contactNumber: '0000000000',
        },
        {
            name: 'Weherahena',
            latitude: 5.95705,
            longitude: 80.57766,
            contactNumber: '0413134331',
        },
        {
            name: 'Kekanadura',
            latitude: 5.96068,
            longitude: 80.59895,
            contactNumber: '0000000000',
        },
        {
            name: 'Bambaranda',
            latitude: 5.97066,
            longitude: 80.66051,
            contactNumber: '0000000000',
        },
        {
            name: 'Wewurukannala',
            latitude: 5.97935,
            longitude: 80.69741,
            contactNumber: '0413134332',
        },
        {
            name: 'Beliatta',
            latitude: 6.04270,
            longitude: 80.73663,
            contactNumber: '0000000000',
        },
        // Add more station data here...
    ];

    for (const data of stationData)
    {
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
    for (const data of employeedata)
    {
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

    for (const data of trainData)
    {
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

    for (const data of scheduleData)
    {
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

    for (const data of stationScheduleData)
    {
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


    for (const data of classData)
    {
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

 
    const coachArrangement = [
        { code: 'A', coachId: 5, trainId: 3 },
        { code: 'B', coachId: 5, trainId: 3 },
        { code: 'C', coachId: 8, trainId: 3 },
        { code: 'D', coachId: 8, trainId: 3 },
        { code: 'E', coachId: 3, trainId: 3 },
        { code: 'F', coachId: 3, trainId: 3 },
        { code: 'A', coachId: 5, trainId: 2 },
        { code: 'B', coachId: 5, trainId: 2 },
        { code: 'C', coachId: 8, trainId: 2 },
        { code: 'D', coachId: 8, trainId: 2 },
        { code: 'E', coachId: 3, trainId: 2 },
        { code: 'F', coachId: 3, trainId: 2 },
        // Add more coach data here...
    ];
    for (const data of coachData) { 
        await prisma.coach.create({
            data,
        });
    }

    for (const data of coachArrangement) {
        await prisma.CoachArrangement.create({
            data,
        });
    }
    const uniqueStationPairs = generateUniqueStationPairs(stationData);

    function generateUniqueStationPairs(stationData)
    {
        const stationPairs = [];

        for (let i = 1; i <= stationData.length; i++)
        {
            for (let j = i + 1; j < stationData.length; j++)
            {
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

    for (const data of dummyJourneyPrices)
    {
        await prisma.Journey.create({
            data,
        });
    }


    function getRandomFloat(min, max)
    {
        return parseFloat(((Math.random() * (max - min)) + min).toFixed(2));;
    }

    // Rest of the code remains the same

}

main()
    .catch((e) =>
    {
        throw e;
    })
    .finally(async () =>
    {
        await prisma.$disconnect();
    });