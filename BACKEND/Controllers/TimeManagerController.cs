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
            List<TimeManagerModels.ScheduledTask> schedule = new List<TimeManagerModels.ScheduledTask>();

            List<TimeManagerModels.TaskItem> sortedItems = items.OrderByDescending(x => x.Duration).ToList();

            int[] separateDayClocks = new int[daysToComplete]; // Az egyes napokon eltöltött órák számát tárolja
            foreach (var clock in separateDayClocks)
            {
                separateDayClocks[clock] = 7; // 8-tól 17-ig tart a munkaidő, mivel mindig van egy óra szünet a feladatok között
            }
            int currentDay = 1;
            const int maxHours = 17;
            bool daysGoingForward = true;

            for (int i = 0; i < sortedItems.Count; i++)
            {
                bool[] isDayFull = new bool[daysToComplete]; // Az egyes napokon a munkaidő betelt-e, mindig az aktuális feladatnál újra inicializáljuk, mivel lehet, hogy a következő feladat kisebb lesz
                while (!isDayFull.All(x => x == true))
                {
                    if (sortedItems[i].Duration + 1 + separateDayClocks[currentDay - 1] < maxHours)
                    {
                        // Ütemezett feladat létrehozása
                        schedule.Add(new TimeManagerModels.ScheduledTask
                        {
                            Name = sortedItems[i].Name,
                            Day = currentDay,
                            StartHour = separateDayClocks[currentDay - 1] + 1,
                            EndHour = separateDayClocks[currentDay - 1] + sortedItems[i].Duration + 1
                        });
                        separateDayClocks[currentDay - 1] += sortedItems[i].Duration + 1;
                    }
                    else
                    {
                        isDayFull[currentDay - 1] = true;
                    }

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
            }

            return schedule;
        }
    }
}
