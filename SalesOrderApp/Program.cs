using Microsoft.EntityFrameworkCore;
using SalesOrderApp.Infrastructure.Data;
using SalesOrderApp;
var builder = WebApplication.CreateBuilder(args);

// Repository, AutoMapper 
builder.Services.AddScoped<SalesOrderApp.Application.Interfaces.ISalesOrderRepository, SalesOrderApp.Infrastructure.Data.Repositories.SalesOrderRepository>();
builder.Services.AddAutoMapper(typeof(SalesOrderApp.MappingProfile));

// Add DB Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure HTTP Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReact");

app.UseAuthorization();

app.MapControllers();

app.Run();