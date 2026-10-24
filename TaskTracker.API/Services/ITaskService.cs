using TaskTracker.API.DTOs;
using TaskTracker.API.Entities;
using TaskTracker.API.Services;
namespace TaskTracker.API.Services;

public interface ITaskService
{
    Task<IEnumerable<TaskItem>> GetAllAsync();
    Task<TaskItem> CreateAsync(CreateTaskDto dto);
    Task<bool> ToggleCompleteAsync(int id);
}