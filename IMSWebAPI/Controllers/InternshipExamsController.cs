using System;
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
    public class InternshipExamsController : ControllerBase
    {
        private readonly imsdbContext _context;

        public InternshipExamsController(imsdbContext context)
        {
            _context = context;
        }

        // GET: api/InternshipExams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternshipExam>>> GetInternshipExams()
        {
            return await _context.InternshipExams.ToListAsync();
        }

        // GET: api/InternshipExams/ListByTeacherUserId
        [HttpGet("ListByTeacherUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<InternshipExam>>> ListByTeacherUserId(long userId)
        {
            return await _context.InternshipExams
                .Where(x => x.TeacherId == userId)
                .Include(x => x.Internship.Company)
                .Include(x => x.Internship.StudentInternships).ThenInclude(si => si.Student.User)
                .ToListAsync();
        }

        // GET: api/InternshipExams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InternshipExam>> GetInternshipExam(int id)
        {
            var internshipExam = await _context.InternshipExams.FindAsync(id);

            if (internshipExam == null)
            {
                return NotFound();
            }

            return internshipExam;
        }

        // PUT: api/InternshipExams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInternshipExam(int id, InternshipExam internshipExam)
        {
            if (id != internshipExam.Id)
            {
                return BadRequest();
            }

            _context.Entry(internshipExam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InternshipExamExists(id))
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

        // PUT: api/InternshipExams/Mark
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Mark")]
        public async Task<IActionResult> Mark(int internshipId, bool passed, short acceptedDay)
        {
            
            var intern = _context.InternshipExams.Where(x => x.InternshipId == internshipId).FirstOrDefault();
            intern.Passed = passed;
            intern.AcceptedWorkDay = acceptedDay;

            _context.Entry(intern).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InternshipExamExistsByInternshipId(internshipId))
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

        // POST: api/InternshipExams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InternshipExam>> PostInternshipExam(InternshipExam internshipExam)
        {
            _context.InternshipExams.Add(internshipExam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInternshipExam", new { id = internshipExam.Id }, internshipExam);
        }

        // POST: api/InternshipExams/setExamAssignment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("setExamAssignment")]
        public async Task<ActionResult<InternshipExam>> SetExamAssignment(InternshipExam internshipExam)
        {
            if(internshipExam.AcceptedWorkDay == null)
            {
                internshipExam.AcceptedWorkDay = 0;
            }
            if(internshipExam.Passed == null)
            {
                internshipExam.Passed = false;
            }
            //internshipExam.ExamTime = new DateOnly(internshipExam.ExamTime.Year, 1, 1);
            _context.InternshipExams.Add(internshipExam);

            var doc = await _context.InternshipDocControls.Where(x => x.InternshipId == internshipExam.InternshipId).FirstOrDefaultAsync();
            doc.Accepted = true;
            _context.Entry(doc).State = EntityState.Modified;


            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInternshipExam", new { id = internshipExam.Id }, internshipExam);
        }

        // DELETE: api/InternshipExams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInternshipExam(int id)
        {
            var internshipExam = await _context.InternshipExams.FindAsync(id);
            if (internshipExam == null)
            {
                return NotFound();
            }

            _context.InternshipExams.Remove(internshipExam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InternshipExamExists(int id)
        {
            return _context.InternshipExams.Any(e => e.Id == id);
        }

        private bool InternshipExamExistsByInternshipId(int id)
        {
            return _context.InternshipExams.Any(e => e.InternshipId == id);
        }
    }
}
