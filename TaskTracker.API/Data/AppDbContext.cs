using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Entities;

namespace TaskTracker.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
}