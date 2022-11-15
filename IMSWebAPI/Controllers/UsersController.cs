using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IMSWebAPI.Models;
using IMSWebAPI.Models.APIModels;

using IMSWebAPI.Tools;

namespace IMSWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly imsdbContext _context;

        public UsersController(imsdbContext context)
        {
            _context = context;
        }

        // POST: api/Users/Login
        [HttpPost("login")]
        public async Task<ActionResult<AfterLoginInfo>> Login(UserNameAndPassword unap)
        {
            AfterLoginInfo afterLoginInfo = new AfterLoginInfo();
            if(unap.UserName.Length == 9)
            {
                var student = await _context.Students.Where(u => u.StudentNumber == unap.UserName).FirstOrDefaultAsync();
                var userId = student.UserId;

                var user = await _context.Users.FindAsync(userId);
                var pswHash = user.Password;

                

                
                if(pswHash == Hashing.MD5Hash(unap.Password))
                {
                    if(user.LastLogin != null)
                    {
                        afterLoginInfo.previousLogin = user.LastLogin;
                        user.LastLogin = DateOnly.FromDateTime(DateTime.Now);
                        await _context.SaveChangesAsync();
                    }
                    afterLoginInfo.user = user;
                    afterLoginInfo.user.Password = null;
                    afterLoginInfo.id = student.StudentNumber;
                    afterLoginInfo.role = "student";
                    return afterLoginInfo;
                }
                else
                {
                    return BadRequest("wrong student pass");
                }
            }

            if(unap.UserName.Length == 4)
            {
                var teacher = await _context.Teachers.Where(u => u.RegistrationNumber == unap.UserName).FirstOrDefaultAsync();
                var userId = teacher.UserId;

                var user = await _context.Users.FindAsync(userId);
                var pswHash = user.Password;


                

                if (pswHash == Hashing.MD5Hash(unap.Password))
                {
                    afterLoginInfo.user = user;
                    afterLoginInfo.user.Password = null;
                    afterLoginInfo.id = teacher.RegistrationNumber;

                    //var com = new Commission();
                    var com = await _context.Commissions.Where(c => c.TeacherId == user.Id).ToListAsync();
                    if (com.Count > 0)
                    {
                        if (com[0].TeacherId == user.Id)
                        {
                            afterLoginInfo.role = "commission";

                        }
                    }
                    else
                    {
                        var adm = await _context.Admins.Where(a => a.UserId == user.Id).ToListAsync();
                        if (adm.Count > 0)
                        {
                            if (adm[0].Id == user.Id)
                            {
                                if (adm[0].SuperAdmin)
                                {
                                    afterLoginInfo.role = "superadmin";
                                }
                                else
                                {
                                    afterLoginInfo.role = "admin";
                                }
                            }
                        }
                    }
                }else
                {
                    return BadRequest("wrong teacher pass");
                }
            }
            else
            {
                return BadRequest("wrong info");
            }
            afterLoginInfo.role = "teacher";
            return afterLoginInfo;
        }

        // POST: api/Users/AddUser
        //[HttpPost("adduser")]
        //public async Task<IActionResult> Login(LoginInfo loginInfo)

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/changePassword
        [HttpPut("changepassword")]
        public async Task<ActionResult<Boolean>> ChangePassword(UserIdAndNewOldPassword nop)
        {
            var user = await _context.Users.FindAsync(nop.userId);
            if(user == null) { return BadRequest(); }

            if(user.Password == Hashing.MD5Hash(nop.oldPassword))
            {
                user.Password = Hashing.MD5Hash(nop.newPassword);
                if(user.LastLogin == null)
                {
                    user.LastLogin = DateOnly.FromDateTime(DateTime.Now);
                }
                await _context.SaveChangesAsync();
                return true;
            }

            return BadRequest(); ;

        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users/studentSignUp
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("studentSignUp")]
        public async Task<ActionResult<User>> PostStudent(User user)
        {
            user.Student.UserId = user.Id;
            string randomPass = RandomPass.CreatePassword(6);
            user.Password = Hashing.MD5Hash(randomPass);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            SendMail.sendPassMail(randomPass, user.Email);
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpPost("teacherSignUp")]
        public async Task<ActionResult<User>> PostTeacher(User user)
        {
            user.Teacher.UserId = user.Id;
            string randomPass = RandomPass.CreatePassword(6);
            SendMail.sendPassMail(randomPass, user.Email);
            user.Password = Hashing.MD5Hash(randomPass);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }



        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
