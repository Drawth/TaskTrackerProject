using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Data;
using TaskTracker.API.DTOs;
using TaskTracker.API.Entities;
using TaskTracker.API.Services;
namespace TaskTracker.API.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    // Dependency Injection: AppDbContext dışarıdan enjekte edilir
    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
       return await _context.Tasks
        .OrderBy(t => t.IsCompleted) // Önce tamamlanmamış (false) olanları üste alır
        .ThenByDescending(t => t.CreatedAt) // Kendi içlerinde tarihe göre en yenileri üste dizer
        .ToListAsync();
    }

    public async Task<TaskItem> CreateAsync(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<bool> ToggleCompleteAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return false;

        task.IsCompleted = !task.IsCompleted;
        await _context.SaveChangesAsync();
        return true;
    }
}