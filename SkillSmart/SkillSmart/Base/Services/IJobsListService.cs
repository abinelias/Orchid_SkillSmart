using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IJobsListService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAll();
    }
}
