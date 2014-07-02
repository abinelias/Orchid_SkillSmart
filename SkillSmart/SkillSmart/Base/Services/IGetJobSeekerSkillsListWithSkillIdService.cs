using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IGetJobSeekerSkillsListWithSkillIdService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllJobSeekersSkillsListForSkillId(string id);

    }
}
