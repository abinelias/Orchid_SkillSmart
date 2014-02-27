using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IWorkHistoryService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetJobSeekerWorkHistory(string id);

    }
}
