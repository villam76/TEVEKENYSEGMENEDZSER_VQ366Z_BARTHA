namespace BACKEND.Models
{
    public class TimeManagerModels
    {
        public class TaskItem
        {
            public string Name { get; set; } = String.Empty;
            public int Duration {  get; set; }
        }

        public class ScheduleRequest
        {
            public List<TaskItem> Items { get; set; } = new List<TaskItem>();
            public int DaysToComplete { get; set; }
        }

        public class ScheduledTask
        {
            public string Name { get; set; } = String.Empty;
            public int Day { get; set; }
            public int StartHour {  get; set; }
            public int EndHour { get; set; }
        }
    }
}
