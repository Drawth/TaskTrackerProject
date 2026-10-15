using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Data;

var builder = WebApplication.CreateBuilder(args);

// DbContext Kaydı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tasks.db"));

builder.Services.AddControllers();

// Swagger Servisleri
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // /swagger adresini aktif eder
}

app.MapControllers();
app.Run();