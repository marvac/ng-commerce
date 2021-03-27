using API.DTOs;
using API.Errors;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AuthController : BaseApiController
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return new UserDTO
                    {
                        Email = user.Email,
                        Token = "token here",
                        DisplayName = user.DisplayName
                    };
                }
            }

            return Unauthorized(new ApiResponse(HttpStatusCode.Unauthorized));
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.Email
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
            {
                return new UserDTO
                {
                    DisplayName = user.DisplayName,
                    Token = "tokenb here",
                    Email = user.Email
                };
            }

            return BadRequest(new ApiResponse(HttpStatusCode.BadRequest));
        }
    }
}
