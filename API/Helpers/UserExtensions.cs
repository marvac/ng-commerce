using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Helpers
{
    public static class UserExtensions
    {
        public static async Task<AppUser> FindUserByClaimsPrincipalAsync(this UserManager<AppUser> userManager, ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await userManager.Users
                .Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<Address> FindAddressByClaimsPrincipalAsync(this UserManager<AppUser> userManager, ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return (await userManager.Users
                .Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.Email == email))?.Address;
        }

        public static string GetEmailFromPrincipal(this ClaimsPrincipal user)
        {
            //return user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            return user.FindFirstValue(ClaimTypes.Email);
        }
    }
}
