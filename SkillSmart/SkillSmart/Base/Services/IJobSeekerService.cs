using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IJobSeekerService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetJobSeekerList(int limit, int skip);

        IEnumerable<T> GetAll();

    }
}
