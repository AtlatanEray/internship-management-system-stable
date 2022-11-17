﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IMSWebAPI.Models;


namespace IMSWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternshipControlInfoesController : ControllerBase
    {
        private readonly imsdbContext _context;

        public InternshipControlInfoesController(imsdbContext context)
        {
            _context = context;
        }

        // GET: api/InternshipControlInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternshipControlInfo>>> GetInternshipControlInfos()
        {
            return await _context.InternshipControlInfos.ToListAsync();
        }

        // GET: api/InternshipControlInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InternshipControlInfo>> GetInternshipControlInfo(int id)
        {
            var internshipControlInfo = await _context.InternshipControlInfos.FindAsync(id);

            if (internshipControlInfo == null)
            {
                return NotFound();
            }

            return internshipControlInfo;
        }

        // GET: api/InternshipControlInfoes/AllInternships
        [HttpGet("allinternships")]
        public async Task<ActionResult<IEnumerable<InternshipControlInfo>>> GetInternshipsAll()
        {
            var internships = await _context.InternshipControlInfos
                .Include(x => x.Internship)
                .Include(x => x.Internship.StudentInternships)
                .ThenInclude(x => x.Student.User)
                .ToListAsync();
            return internships;
        }

        // GET: api/InternshipControlInfoes/PendingInternships
        [HttpGet("pendinginternships")]
        public async Task<ActionResult<IEnumerable<InternshipControlInfo>>> GetInternshipsPending()
        {
            var internships = await _context.InternshipControlInfos
                .Where(x => x.InfoMessage == "pending")
                .Include(x => x.Internship)
                .Include(x => x.Internship.StudentInternships)
                .ThenInclude(x => x.Student.User)
                .ToListAsync();
            return internships;
        }

        // GET: api/InternshipControlInfoes/ApprovedInternships
        [HttpGet("approvedinternships")]
        public async Task<ActionResult<IEnumerable<InternshipControlInfo>>> GetInternshipsApproved()
        {
            var internships = await _context.InternshipControlInfos
                .Where(x => x.InfoMessage == "ApplicationApproved")
                .Include(x => x.Internship)
                .Include(x => x.Internship.StudentInternships)
                .ThenInclude(x => x.Student.User)
                .ToListAsync();
            return internships;
        }


        // PUT: api/InternshipControlInfoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInternshipControlInfo(int id, InternshipControlInfo internshipControlInfo)
        {
            if (id != internshipControlInfo.Id)
            {
                return BadRequest();
            }

            _context.Entry(internshipControlInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InternshipControlInfoExists(id))
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

        // PUT: api/InternshipControlInfoes/ApproveApplication
        [HttpPut("ApproveApplication")]
        public async Task<IActionResult> ApproveApplication(int internshipId, bool approve)
        {

            var iControl = await _context.InternshipControlInfos.Where(x => x.InternshipId == internshipId).ToListAsync();
            if (iControl == null)
            {
                return BadRequest("wrong internShipId");
            }

            if(approve)
            {
                iControl.ForEach(x => x.InfoMessage = "ApplicationApproved");
            }else
            {
                iControl.ForEach(x => x.InfoMessage = "ApplicationRejected");
            }

            for(int i=0; i<iControl.Count; i++)
            {
                _context.Entry(iControl[i]).State = EntityState.Modified;
            }



            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InternshipControlInfoExists(internshipId))
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



        // POST: api/InternshipControlInfoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InternshipControlInfo>> PostInternshipControlInfo(InternshipControlInfo internshipControlInfo)
        {
            _context.InternshipControlInfos.Add(internshipControlInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInternshipControlInfo", new { id = internshipControlInfo.Id }, internshipControlInfo);
        }

        // DELETE: api/InternshipControlInfoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInternshipControlInfo(int id)
        {
            var internshipControlInfo = await _context.InternshipControlInfos.FindAsync(id);
            if (internshipControlInfo == null)
            {
                return NotFound();
            }

            _context.InternshipControlInfos.Remove(internshipControlInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InternshipControlInfoExists(int id)
        {
            return _context.InternshipControlInfos.Any(e => e.Id == id);
        }
    }
}
