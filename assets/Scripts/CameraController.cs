using UnityEngine;

public class CameraController : MonoBehaviour
{
    [SerializeField]
    private float speed = 2.0f;

    [SerializeField]
    private Transform target;

    private void Awake()
    {
        // Якщо не задана ціль, то шукаємо об'єкт Character у сцені
        if (!target)
        {
            target = FindObjectOfType<Character>().transform;
        }
    }

    private void Update()
    {
        // Отримуємо позицію цілі
        Vector3 position = target.position;
        // Задаємо глибину (z-координату) камери
        position.z = -10.0f;
        // Плавно переміщуємо камеру до позиції цілі
        transform.position = Vector3.Lerp(transform.position, position, speed * Time.deltaTime);
    }
}
