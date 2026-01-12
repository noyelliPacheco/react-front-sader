
export const LoginResponse = {
    message: 'Consulta exitosa.',
    success: true,
    data:  {
        user: {
            id: '1',
            email: 'noye.itzel@gmail.com',
            fullName: 'Noyelli Itzel',
            isActive: true,
            roles: ['admin', 'user'],
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZW1haWwiOiJub3llLml0emVsQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiTm95ZWxsaSBJdHplbCIsInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJpc0FjdGl2ZSI6dHJ1ZSwiaWF0IjoxNzM0Nzk5MjAwfQ.DUMMY_SIGNATURE_DO_NOT_VERIFY",
    },
    code:    200,
}