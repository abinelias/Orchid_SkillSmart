using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IExtraCurricularActivityService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllExtraCurricularActivityById(string id);

    }
}
