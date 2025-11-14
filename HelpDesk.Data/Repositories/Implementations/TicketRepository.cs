using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace HelpDesk.Data.Repositories.Implementations
{
    public class TicketRepository : GenericRepository<Ticket>, ITicketRepository
    {
        private readonly AppDbContext _context;
        public TicketRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<FunAgentResolutionTimeResponse> GetAverageResolutionTimeByAgentAsync(int agentId)
        {
            var sql = "SELECT get_agent_avg_resolution_time(@agentId)";

            using var command = _context.Database.GetDbConnection().CreateCommand();
            command.CommandText = sql;
            command.Parameters.Add(new NpgsqlParameter("@agentId", agentId));

            await _context.Database.OpenConnectionAsync();
            var result = await command.ExecuteScalarAsync();

            var timeResponse = new FunAgentResolutionTimeResponse
            {
                AverageResolutionHours = result == DBNull.Value ? 0 : Convert.ToDouble(result)
            };

            return timeResponse;
        }

    }
}