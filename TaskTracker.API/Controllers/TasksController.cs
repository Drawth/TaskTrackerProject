using Microsoft.AspNetCore.Mvc;
using TaskTracker.API.DTOs;
using TaskTracker.API.Services;

namespace TaskTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")] // Erişim adresi: api/tasks
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    // Dependency Injection: ITaskService buraya otomatik aktarılır
    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await _taskService.GetAllAsync();
        return Ok(tasks);
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest("Görev başlığı boş olamaz.");

        var createdTask = await _taskService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), new { id = createdTask.Id }, createdTask);
    }

    // PATCH: api/tasks/{id}/toggle
    [HttpPatch("{id}/toggle")]
    public async Task<IActionResult> Toggle(int id)
    {
        var result = await _taskService.ToggleCompleteAsync(id);
        if (!result) return NotFound("Görev bulunamadı.");
        
        return NoContent();
    }
}