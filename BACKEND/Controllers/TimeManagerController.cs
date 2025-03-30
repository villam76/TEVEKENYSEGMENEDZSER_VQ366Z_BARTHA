using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Threading.Tasks;

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
            List<TimeManagerModels.ScheduledTask> schedule = new List<TimeManagerModels.ScheduledTask>();

            List<TimeManagerModels.TaskItem> sortedItems = items.OrderBy(x => x.Duration).ToList();

            int currentDay = 1;
            int currentHour = 7; // 8-tól 17-ig tart a munkaidő, mivel mindig van egy óra szünet a feladatok között
            bool daysGoingForward = true;
            bool allDaysFull = false;

            for (int i = 0; i < sortedItems.Count; i++)
            {
                while (true)
                {
                    break; //TODO!!!
                }
                // Ütemezett feladat létrehozása
                schedule.Add(new TimeManagerModels.ScheduledTask
                {
                    Name = sortedItems[i].Name,
                    Day = currentDay,
                    StartHour = currentHour + 1,
                    EndHour = currentHour + sortedItems[i].Duration + 1
                });

                // Új napra lépés
                if (daysGoingForward && currentDay < daysToComplete)
                {
                    currentDay++;
                }
                else if (daysGoingForward && currentDay == daysToComplete)
                {
                    daysGoingForward = false;
                }
                else if (!daysGoingForward && currentDay > 1)
                {
                    currentDay--;
                }
                else if (!daysGoingForward && currentDay == 1)
                {
                    daysGoingForward = true;
                }
            }

            return schedule;
        }
    }
}
