using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/timemanager")]
    public class TimeManagerController : ControllerBase
    {
        [HttpPost]
        public IActionResult GenerateSchedule([FromBody] TimeManagerModels.ScheduleRequest request)
        {
            var schedule = ScheduleCreator(request.Items, request.DaysToComplete);
            return Ok(schedule);
        }

        private List<TimeManagerModels.ScheduledTask> ScheduleCreator(List<TimeManagerModels.TaskItem> items, int daysToComplete)
        {
            throw new NotImplementedException();
        }
    }
}
