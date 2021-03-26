using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class IdentityContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Default",
                    Email = "default@example.com",
                    UserName = "default@example.com",
                    Address = new Address
                    {
                        FirstName = "John",
                        LastName = "Doe",
                        Street = "123 Main St.",
                        City = "Fake City",
                        State = "CA",
                        ZipCode = "99999"
                    }
                };

                await userManager.CreateAsync(user, "password");
            }
        }
    }
}
